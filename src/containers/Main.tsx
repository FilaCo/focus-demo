import { useEffect, useState } from 'react'
import VideoGrid from '../components/organisms/VideoGrid'
import VideoEntry from '../VideoEntry'
import { Container, Typography } from '@material-ui/core'
import Focus, {
  ControlRateLabel,
  SegmentExportRoiLabel,
  ExportRoi,
} from '@chekushka/focus'

interface Props {
  className?: string
}

const update = async (
  exportRoi: ExportRoi,
  target: HTMLCanvasElement,
  source: HTMLVideoElement,
): Promise<void> => {
  const context = target.getContext('2d')

  const rois = await exportRoi(source)

  switch (rois.type) {
    case 'bbox':
      break
    case 'depth':
      break
    case 'segment':
      const { height, width, segmentationMap } = rois

      const segmentationData = new ImageData(segmentationMap, width)

      const ibm = await createImageBitmap(
        segmentationData,
        0,
        0,
        width,
        height,
        {
          resizeWidth: target.width,
          resizeHeight: target.height,
        },
      )

      context?.drawImage(ibm, 0, 0)
      break
    default:
      break
  }

  requestAnimationFrame(() => update(exportRoi, target, source))
}

const getVideoTrackWithRoi = (
  videoTrack: MediaStreamTrack,
): Promise<MediaStreamTrack> => {
  const { exportRoi } = Focus.config()

  const canvas = document.createElement('canvas')

  canvas.style.width = '100%'
  canvas.style.height = '100%'

  const video = document.createElement('video')

  video.srcObject = new MediaStream([videoTrack])
  video.autoplay = true

  video.addEventListener('playing', async () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    await update(exportRoi, canvas, video)
  })

  // @ts-ignore
  return canvas.captureStream().getVideoTracks()[0]
}

const Main = (props: Props) => {
  const [videos, setVideos] = useState<VideoEntry[]>()

  useEffect(() => {
    const constraints = {
      video: {
        width: 640,
        height: 480,
      },
      audio: false,
    }

    const getWebcamStream = async () => {
      const userMedia = await navigator.mediaDevices.getUserMedia(constraints)

      Focus.setExportRoi(SegmentExportRoiLabel.Deeplab)
      Focus.setControlRate(ControlRateLabel.Dummy)

      const roiExportedTrack = await getVideoTrackWithRoi(
        userMedia.getVideoTracks()[0],
      )

      const roiExportedUserMedia = new MediaStream([
        roiExportedTrack,
        ...userMedia.getAudioTracks(),
      ])

      const encodedTrack = await Focus.encode(
        { getBandwidth: () => 100 },
        userMedia.getVideoTracks()[0],
      )

      const encodedUserMedia = new MediaStream([
        encodedTrack,
        ...userMedia.getAudioTracks(),
      ])

      setVideos([
        { stream: userMedia, title: 'Input video' },
        { stream: roiExportedUserMedia, title: 'After ROIs export' },
        { stream: encodedUserMedia, title: 'After rate control' },
      ])
    }

    getWebcamStream()
  }, [])

  return (
    <Container maxWidth="xl" {...props}>
      {!videos && <Typography>Loading...</Typography>}
      {videos && <VideoGrid videos={videos} spacing={5} />}
    </Container>
  )
}

export default Main

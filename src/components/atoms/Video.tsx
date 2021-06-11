import { useEffect, useRef, VideoHTMLAttributes } from 'react'

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  srcObject: MediaProvider
}

const Video = (props: Props) => {
  const { srcObject, ...rest } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.srcObject = srcObject
  }, [srcObject])

  return <video ref={videoRef} {...rest} />
}

export default Video

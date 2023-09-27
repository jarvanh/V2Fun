import { Image, ImageProps } from 'expo-image'
import {
  isArray,
  isEqual,
  isObject,
  isPlainObject,
  isString,
  pick,
} from 'lodash-es'
import { useQuery } from 'quaere'
import { useState } from 'react'
import { LayoutRectangle, View, ViewStyle } from 'react-native'
import { SvgXml, UriProps } from 'react-native-svg'

import { svgQuery } from '@/servicies/other'
import { hasSize } from '@/utils/hasSize'
import tw from '@/utils/tw'
import { isSvgURL, resolveURL } from '@/utils/url'

const uriToSize = new Map()

function CustomImage({ style, source, onLoad, onError, ...props }: ImageProps) {
  const uri =
    isObject(source) && !isArray(source) && isString(source.uri)
      ? resolveURL(source.uri)
      : undefined

  const [isLoading, setIsLoading] = useState(uri ? !uriToSize.has(uri) : false)

  const [size, setSize] = useState<LayoutRectangle>(uriToSize.get(uri))

  const hadPassedSize = hasSize(style)

  const isMiniImage = hasSize(size)
    ? size.width < 100 && size.height < 100
    : false

  return (
    <Image
      {...props}
      source={
        isObject(source)
          ? {
              ...source,
              uri,
            }
          : source
      }
      onLoad={ev => {
        const newSize: any = pick(ev.source, ['width', 'height'])

        uriToSize.set(uri, newSize)
        setSize(prev => (isEqual(prev, newSize) ? prev : newSize))
        setIsLoading(false)
        onLoad?.(ev)
      }}
      onError={err => {
        uriToSize.set(uri, undefined)
        setIsLoading(false)
        onError?.(err)
      }}
      style={tw.style(
        !hadPassedSize &&
          (isMiniImage
            ? size
            : {
                aspectRatio: size ? size.width / size.height : 1,
                width: `100%`,
              }),
        !hadPassedSize && uriToSize.has(uri) && !uriToSize.get(uri) && `hidden`,
        style as ViewStyle,
        isLoading && `img-loading`
      )}
    />
  )
}

function CustomSvgUri({ uri, style, ...props }: UriProps) {
  const { data: svg, error } = useQuery({
    query: svgQuery,
    variables: { url: uri! },
    enabled: !!uri,
  })

  if (error) return null

  if (!svg?.xml) {
    return (
      <View
        style={
          hasSize(style)
            ? tw.style(style, `img-loading`)
            : tw.style(`img-loading`, 'aspect-square')
        }
      />
    )
  }

  const svgStyle = {
    aspectRatio: svg.width / svg.height || 1,
    width: '100%',
  }

  return (
    <SvgXml
      {...props}
      xml={svg.xml}
      style={
        (isArray(style)
          ? [svgStyle, ...style]
          : {
              ...svgStyle,
              ...(isPlainObject(style) && (style as any)),
            }) as any
      }
      width="100%"
    />
  )
}

export default function StyledImage({ source, ...props }: ImageProps) {
  if (
    isObject(source) &&
    !isArray(source) &&
    isString(source.uri) &&
    isSvgURL(source.uri)
  ) {
    return <CustomSvgUri uri={source.uri} {...(props as any)} />
  }

  return <CustomImage source={source} {...props} />
}

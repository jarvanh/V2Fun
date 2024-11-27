import { useAtomValue } from 'jotai'
import { View, ViewStyle } from 'react-native'
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'

import { uiAtom } from '@/jotai/uiAtom'
import tw from '@/utils/tw'

import StyledFade from './StyledFade'

function AvatarPlaceholder() {
  const { colors } = useAtomValue(uiAtom)
  return (
    <PlaceholderMedia
      style={tw`w-6 h-6 rounded-full mr-3`}
      color={colors.base300}
    />
  )
}

export function TopicItemPlaceholder({ hideAvatar }: { hideAvatar?: boolean }) {
  const { colors, fontSize } = useAtomValue(uiAtom)
  const fontMedium = tw.style(fontSize.medium) as {
    fontSize: number
    lineHeight: number
  }
  const mediumLineStyle = tw`h-[${fontMedium.fontSize}px] my-[${Math.floor(
    (fontMedium.lineHeight - fontMedium.fontSize) / 2
  )}px]`

  return (
    <Placeholder
      style={tw`px-4 py-3 flex-row bg-[${colors.base100}] border-b border-solid border-[${colors.divider}]`}
      Left={hideAvatar ? undefined : AvatarPlaceholder}
    >
      <View>
        <PlaceholderLine
          width={40}
          color={colors.base300}
          style={mediumLineStyle}
        />
        <PlaceholderLine style={mediumLineStyle} color={colors.base300} />
        <PlaceholderLine
          width={80}
          style={mediumLineStyle}
          color={colors.base300}
        />
      </View>
    </Placeholder>
  )
}

export default function TopicPlaceholder({
  style,
  hideAvatar,
  hideAnimation,
}: {
  style?: ViewStyle
  hideAvatar?: boolean
  hideAnimation?: boolean
}) {
  return (
    <Placeholder
      Animation={hideAnimation ? undefined : StyledFade}
      style={style}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <TopicItemPlaceholder key={i} hideAvatar={hideAvatar} />
      ))}
    </Placeholder>
  )
}

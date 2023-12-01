/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Node, Topic } from './servicies/types'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    transformResponseScript?: string
  }
}

export type RootStackParamList = {
  Root: undefined
  Home: undefined
  SortTabs: undefined
  NotFound: undefined
  MyNodes: undefined
  MyTopics: undefined
  MyFollowing: undefined
  Notifications: undefined
  Search: {
    query?: string
  }
  SearchOptions: undefined
  SearchNode: {
    onPressNodeItem: (node: Node) => void
  }
  SearchReplyMember: {
    topicId: number
    onAtNames: (atNames: string) => void
  }
  Login: undefined
  TopicDetail: Partial<Topic> & { hightlightReplyNo?: number; id: number }
  RelatedReplies: {
    replyId: number
    onReply: (username: string) => void
    topicId: number
  }
  NodeTopics: {
    name: string
  }
  MemberDetail: {
    username: string
  }
  WriteTopic: {
    topic?: Topic
  }
  NavNodes: undefined
  GItHubMD: {
    url: string
    title: string
  }
  WebSignin: {
    once: string
    onTwoStepOnce: (once: string) => void
  }
  RecentTopic: undefined
  Setting: undefined
  Rank: undefined
  BlankList: undefined
  Webview: {
    url: string
  }
  ImgurConfig: undefined
  SelectableText: {
    html: string
  }
  HotestTopics: undefined
  ConfigureDomain: undefined
  EditSocks5Screen: {
    index?: number
  }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

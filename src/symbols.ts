import type { InjectionKey } from 'vue'
import type { GlobalConfig } from '@/types'

// https://logaretm.com/blog/type-safe-provide-inject/
export const globalConfig: InjectionKey<GlobalConfig> = Symbol('GlobalConfig')

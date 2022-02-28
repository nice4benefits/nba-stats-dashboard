import { defineStore } from 'pinia'
import type { Averages } from '@/types'

export const useTopPlayersAveragesStore = defineStore({
  id: 'topPlayersAverages',
  state: (): { [key: string]: Averages } => ({
    mjordan: {
      games_played: 82,
      player_id: 2931,
      season: 1996,
      min: '37:54',
      fgm: 11.22,
      fga: 23.07,
      fg3m: 1.35,
      fg3a: 3.62,
      ftm: 5.85,
      fta: 7.02,
      oreb: 1.38,
      dreb: 4.5,
      reb: 5.88,
      ast: 4.29,
      stl: 1.71,
      blk: 0.54,
      turnover: 2.02,
      pf: 1.9,
      pts: 29.65,
      fg_pct: 0.486,
      fg3_pct: 0.374,
      ft_pct: 0.833
    },
    ljames: {
      games_played: 82,
      player_id: 237,
      season: 2017,
      min: '36:53',
      fgm: 10.45,
      fga: 19.27,
      fg3m: 1.82,
      fg3a: 4.95,
      ftm: 4.73,
      fta: 6.48,
      oreb: 1.18,
      dreb: 7.46,
      reb: 8.65,
      ast: 9.11,
      stl: 1.41,
      blk: 0.87,
      turnover: 4.23,
      pf: 1.66,
      pts: 27.45,
      fg_pct: 0.542,
      fg3_pct: 0.367,
      ft_pct: 0.731
    }
  }),
  getters: {
    getAverageByName:
      (state) =>
      (player: string, name: keyof Averages): string | number =>
        state[player][name]
  }
})

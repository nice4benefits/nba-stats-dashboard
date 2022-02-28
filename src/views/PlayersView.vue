<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  players: {
    id: number
    first_name: string
    last_name: string
    team: {
      full_name: string
    }
  }[]
}>()
</script>

<template>
  <div
    class="col-span-full p-4 sm:p-6 bg-white shadow-lg border border-gray-200 text-sm"
  >
    <div class="p-3">
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead class="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">First name</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Last name</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Team</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm font-medium divide-y divide-gray-100">
            <tr
              v-for="{
                id,
                first_name: firstName,
                last_name: lastName,
                team: { full_name: team }
              } in players"
              :key="id"
              @click.stop="
                $router.push({
                  name: 'player',
                  params: { firstName, lastName, id }
                })
              "
              class="hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
            >
              <td class="p-2">
                <RouterLink
                  :to="{ name: 'player', params: { firstName, lastName, id } }"
                >
                  {{ firstName }}
                </RouterLink>
              </td>
              <td class="p-2">
                <RouterLink
                  :to="{ name: 'player', params: { firstName, lastName, id } }"
                >
                  {{ lastName }}
                </RouterLink>
              </td>
              <td class="p-2">
                <RouterLink
                  :to="{ name: 'player', params: { firstName, lastName, id } }"
                >
                  {{ team }}
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

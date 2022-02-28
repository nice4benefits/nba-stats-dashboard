<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  sidebarOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close-sidebar'): void
}>()

const sidebar = ref<HTMLDivElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)

const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
const sidebarExpanded = ref(
  storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
)

// close on click outside
const clickHandler = (event: MouseEvent) => {
  if (!sidebar.value || !trigger.value) return
  if (
    !props.sidebarOpen ||
    sidebar.value.contains(event.target as HTMLElement) ||
    trigger.value.contains(event.target as HTMLElement)
  )
    return

  emit('close-sidebar')
}

// close if the esc key is pressed
const keyHandler = ({ keyCode }: { keyCode: number }) => {
  if (!props.sidebarOpen || keyCode !== 27) return

  emit('close-sidebar')
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})

watch(sidebarExpanded, () => {
  const body = document.querySelector('body')
  localStorage.setItem('sidebar-expanded', sidebarExpanded.value.toString())

  if (sidebarExpanded.value) {
    body?.classList.add('sidebar-expanded')
  } else {
    body?.classList.remove('sidebar-expanded')
  }
})
</script>

<template>
  <nav>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-gray-500 hover:text-gray-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
            />
          </svg>
        </button>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <div>
          <ul>
            <li class="px-3 py-2 text-white">
              <RouterLink :to="{ name: 'players' }">
                <div class="flex items-center">
                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      class="fill-current text-gray-600"
                      d="M0 20h24v2H0z"
                    />
                    <path
                      class="fill-current text-gray-400"
                      d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                    />
                  </svg>
                  <span class="ml-3 lg:opacity-0 2xl:opacity-100">
                    All players
                  </span>
                </div>
              </RouterLink>
            </li>
            <li class="px-3 py-2 text-white">
              <div class="flex items-center">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    class="fill-current text-gray-600"
                    d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                  />
                  <path
                    class="fill-current text-gray-400"
                    d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                  />
                </svg>
                <span class="ml-3 lg:opacity-0 2xl:opacity-100">
                  Top 5 of 2021
                </span>
              </div>
              <div class="2xl:block">
                <ul class="pl-6 mt-1">
                  <li>
                    <RouterLink
                      :to="{
                        name: 'player',
                        params: {
                          firstName: 'Kevin',
                          lastName: 'Durant',
                          id: 140
                        }
                      }"
                    >
                      <span
                        class="ml-3 text-sm text-gray-400 lg:opacity-0 2xl:opacity-100"
                      >
                        Kevin Durant
                      </span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        name: 'player',
                        params: {
                          firstName: 'Giannis',
                          lastName: 'Antetokounmpo',
                          id: 15
                        }
                      }"
                    >
                      <span
                        class="ml-3 text-sm text-gray-400 lg:opacity-0 2xl:opacity-100"
                      >
                        Giannis Antetokounmpo
                      </span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        name: 'player',
                        params: {
                          firstName: 'James',
                          lastName: 'Harden',
                          id: 192
                        }
                      }"
                    >
                      <span
                        class="ml-3 text-sm text-gray-400 lg:opacity-0 2xl:opacity-100"
                      >
                        James Harden
                      </span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        name: 'player',
                        params: {
                          firstName: 'Nicola',
                          lastName: 'Jokic',
                          id: 246
                        }
                      }"
                    >
                      <span
                        class="ml-3 text-sm text-gray-400 lg:opacity-0 2xl:opacity-100"
                      >
                        Nicola Jokic
                      </span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        name: 'player',
                        params: {
                          firstName: 'Joel',
                          lastName: 'Embiid',
                          id: 145
                        }
                      }"
                    >
                      <span
                        class="ml-3 text-sm text-gray-400 lg:opacity-0 2xl:opacity-100"
                      >
                        Joel Embiid
                      </span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </li>
            <li class="px-3 py-2 text-white">
              <RouterLink :to="{ name: 'about' }">
                <div class="flex items-center">
                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      class="fill-current text-gray-600"
                      d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                    />
                    <path
                      class="fill-current text-gray-400"
                      d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                    />
                  </svg>
                  <span class="ml-3 lg:opacity-0 2xl:opacity-100"> About </span>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<template>
  <div class="h-full w-full">
    <!-- card for the top 3 leaderboard -->
    <Card class="h-full" v-if="leaderboardStore.top3Avatars.length == 3">
      <CardHeader>
        <CardTitle class="text-center">
          <span v-if="user && leaderboardStore.userPlace">Your Stats & </span
          >Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          v-if="user && leaderboardStore.userPlace"
          class="mb-6 flex justify-evenly"
        >
          <div class="text-center">
            <p class="text-2xl font-bold">
              {{ useOrdinalPlace(leaderboardStore.userPlace) }}
            </p>
            <p class="text-sm text-muted-foreground">place</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold">
              {{ leaderboardStore.numberOfCorrect }}
            </p>
            <p class="text-sm text-muted-foreground">Points</p>
          </div>
        </div>
        <div class="space-y-4">
          <div
            v-for="(avatar, index) in leaderboardStore.top3Avatars"
            :key="index"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  v-if="avatar?.image"
                  :src="avatar?.image"
                  draggable="false"
                ></AvatarImage>
                <AvatarFallback class="text-lg">{{
                  useFirstName(avatar?.name ?? ' ')[0]
                }}</AvatarFallback>
              </Avatar>
              <span>{{ avatar?.name ?? '' }}</span>
            </div>
            <span
              >{{
                leaderboardStore.top10[index]?.correct_answers ?? 0
              }}
              pts</span
            >
          </div>
        </div>
      </CardContent>
    </Card>
    <Card v-else class="flex h-56 w-full lg:h-full">
      <Skeleton class="h-full w-full" />
    </Card>
  </div>
</template>

<script setup>
const leaderboardStore = useLeaderboardStore();
const user = useSupabaseUser();
</script>

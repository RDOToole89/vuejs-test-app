import { defineStore } from "pinia";
import { Post, today, thisWeek, thisMonth } from "../posts";
import { Period } from "../constants";
import { DateTime } from "luxon";
import { TimeLinePost } from "../posts";

// instead of using an array which is O(n)
// we use a Map which is O(1) when we use a lookup by id
interface PostsState {
  ids: string[],
  all: Map<string, Post>, 
  selectedPeriod: Period
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
    selectedPeriod: "Today"
  }),

  getters: {
    filteredPosts: (state: PostsState): TimeLinePost[] => {
      return state.ids
        .map((id: string) => {
          const post = state.all.get(id);      
          if (!post) {
            throw new Error(`Post with id of ${id} was expected but not found`);
          }
    
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post: TimeLinePost) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }
          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }
          return post;
        });
    }
  },

  actions: {
    setSelectedPeriod (period: Period) {
      this.selectedPeriod = period;
    }
  }
});

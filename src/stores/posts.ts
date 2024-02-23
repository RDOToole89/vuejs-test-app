import { reactive, readonly } from "vue";

// ref is a function that creates a reactive object
// computed is a function that creates a computed value
// reactive is a function that creates a reactive object {}, Map, Set, or Array

interface PostsState {
  foo: string;
}

export class PostsStore {
  #state: PostsState;

  constructor () {
    // Create a reactive state object
    this.#state = reactive<PostsState>({
      foo: "foo"
    });
  }

  // We can use a getter to return a readonly version of the state
  getState () {
    // Return a readonly version of the state to prevent accidental mutations
    return readonly(this.#state);
  } 

  // We can use a method to update the state
  updateFoo (newFoo: string) {
    this.#state.foo = newFoo;
  }
}

const store = new PostsStore();

// store.updateFoo("baz");

export function usePosts () {
  return store;
}
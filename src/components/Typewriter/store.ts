import { proxy, useSnapshot } from 'valtio';

interface State {
  messages: string[];
  index: number;
  message: string;
}

class Store {
  private state: State = proxy<State>({
    messages: [],
    index: 0,
    message: '',
  });

  useState() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSnapshot(this.state);
  }

  updateState(mutate: (state: State) => void) {
    return mutate(this.state);
  }
}

const TypewriterStore = new Store();

export default TypewriterStore;

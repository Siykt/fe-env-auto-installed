import { TypewriterClass } from "typewriter-effect";
import { proxy, useSnapshot } from "valtio"

interface State {
  step: number
}

class Store {
  private state: State = proxy<State>({
    step: 0,
  });

  getState() {
    return this.state;
  }

  useState() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSnapshot(this.state);
  }

  updateState(mutate: (state: State) => void) {
    return mutate(this.state);
  }

  nextStep() {
    this.updateState((state) => {
      state.step += 1;
    });
  }

  toStep(step: number) {
    this.updateState((state) => {
      state.step = step;
    });
  }
}

const InstallAPPStore = new Store();

export default InstallAPPStore;

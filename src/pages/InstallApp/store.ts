import { proxy, useSnapshot } from 'valtio';
import { AppMap } from './types';

interface State {
  step: number;
  downloadSet: Set<AppMap>;
}

class Store {
  private state: State = proxy<State>({
    step: 0,
    downloadSet: new Set(),
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

  addDownload(app: AppMap) {
    this.updateState((state) => {
      state.downloadSet.add(app);
    });
  }

  stop() {
    this.updateState((state) => {
      state.downloadSet.clear();
      state.step = 999;
    });
  }
}

const InstallAPPStore = new Store();

export default InstallAPPStore;

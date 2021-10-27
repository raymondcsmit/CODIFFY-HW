import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HideLoader, ShowLoader } from "./app.actions";

export class LoaderStateModel {
  public status!: boolean;
}

@State<LoaderStateModel>({
  name: 'loader',
  defaults: {
    status: false
  }
})

@Injectable()
export class LoaderState {

  @Selector()
  public static status(state: LoaderStateModel) {
    return state.status??false;
  }


  @Action(ShowLoader)
  showLoader(store: StateContext<LoaderStateModel>) {
    store.setState({ status:true});
  }

  @Action(HideLoader)
  hideLoader(store: StateContext<LoaderStateModel>) {
    store.setState({status:false});
  }
}
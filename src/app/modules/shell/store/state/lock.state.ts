import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CloseSidenav, OpenSidenav } from '../actions/layout.actions';
import { ChangeIdleState, ChangeLastPing, ChangeTimeOut, LastRoute } from '../actions/lock.actions';


export interface LockStateModel {
    
    idleState:string;// = 'Not started.';
    timedOut:boolean;// = false;
    lastPing?: Date; //= new Date();
    onRouteLock:string;// Route on which the screen locked
  }
  
  @State<LockStateModel>({
    name: 'lock',
    defaults: {
      idleState : 'Not started.',
      timedOut : false,
      lastPing:  new Date(),
      onRouteLock:"/"
    }
  })
  @Injectable()
  export class LockState {
    @Selector()
    static getIdleState(state: LockStateModel) {
      return state.idleState;
    }
  
    @Selector()
    static getTimedOut(state: LockStateModel) {
      return state.timedOut;
    }

    
    @Selector()
    static getLastPing(state: LockStateModel) {
      return state.lastPing;
    }

    @Action(ChangeIdleState)
    changeIdleState({getState, patchState }: StateContext<LockStateModel>, action:ChangeIdleState) {
      const state = getState();       
      patchState({
        ...state,
        idleState:action.idlestate
      });
    }  
    @Action(LastRoute)
    lastRoute({getState, patchState }: StateContext<LockStateModel>, action:LastRoute) {
      const state = getState();       
      patchState({
        ...state,
        onRouteLock:action.route
      });
    } 
    @Action(ChangeTimeOut)
    changeTimeOut({getState, patchState }: StateContext<LockStateModel>, action:ChangeTimeOut) {
      const state = getState();       
      patchState({
        ...state,
        timedOut:action.Timeout
      });
    }

    @Action(ChangeLastPing)
    changeLastPing({getState, patchState }: StateContext<LockStateModel>, action:ChangeLastPing) {
      const state = getState();       
      patchState({
        ...state,
        lastPing:action.LastPing
      });
    }

  }
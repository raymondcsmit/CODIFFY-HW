export class ChangeIdleState {
    static readonly type = '[Lock] Change Idle State';
    constructor(public idlestate: string) {
    }
  }
  export class LastRoute {
    static readonly type = '[Lock] Last Route';
    constructor(public route: string) {
    }
  }
  export class ChangeTimeOut {
    static readonly type = '[Lock] Change Time Out';
    constructor(public Timeout: boolean) {
    }
  }
  export class ChangeLastPing {
    static readonly type = '[Lock] Change Last Ping Date and Time ';
    constructor(public LastPing: Date) {
    }
  }
  
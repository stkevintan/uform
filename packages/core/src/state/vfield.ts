import { createStateModel, ModelType } from '../shared/model'
import { clone, FormPath } from '@uform/shared'
import { IVFieldState, IVFieldStateProps } from '../types'

/**
 * UForm特有，描述一个虚拟字段，
 * 它不占用数据空间，但是它拥有状态，
 * 可以联动控制Field或者VField的状态
 * 类似于现在UForm的Card之类的容器布局组件
 */

export type VFieldStateModel<P = any> = ModelType<
  P,
  IVFieldState,
  IVFieldStateProps
>

export const VFieldState = createStateModel<
  any,
  IVFieldState,
  IVFieldStateProps
>(
  class VFieldState {
    static displayName = 'VFieldState'
    static defaultState: IVFieldState = {
      path: FormPath.getPath(),
      name: '',
      initialized: false,
      visible: true,
      display: true,
      mounted: false,
      unmounted: false,
      props: {}
    }

    static defaultProps: IVFieldStateProps = {}

    private state: IVFieldState

    constructor(state: IVFieldState, props: IVFieldStateProps) {
      this.state = state
      this.state.path = FormPath.getPath(props.path)
      this.state.name = this.state.path.entire
      this.state.props = clone(props.props)
    }

    publishState() {
      return {
        path: FormPath.getPath(this.state.path),
        ...this.state
      }
    }
  }
)

# react实现弹框组件
Portals 提供了一种超级棒的方法，可以将 react 子节点的 DOM 结构，渲染到 react 父节点之外的 DOM 中。


## 之前的实现,利用高阶组件
```jsx
export const Portal = <TWrappedCompProps extends { visible: boolean }>(
WrappedComponent: React.ComponentType
): React.ComponentType =>
class extends Component {
  private node: HTMLDivElement;
  constructor(props) {
  super(props);  
  if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }
  }

  public componentWillUnmount() {
    if (this.node) {
      this.node.remove();
    }
  }

  public renderContent() {
    return <WrappedComponent {...this.props} />;
  }
  public render() {
    const { visible } = this.props;
    if (visible && this.node) {
      return ReactDOM.createPortal(this.renderContent(), this.node);
    }
    return null;
  }
};
        
 // 使用
        
 export const CommonModal = Portal(CommonModalRaw) as React.ComponentType<Props>;
```

## 现在的react hooks实现方式
hooks的可能比较更加灵活一点
```jsx
type Props = {
  children: React.ReactChild;
  closeModal: () => void;
}
export const Modal = React.memo(({ children, closeModal }: Props) => {
  const domEl = document.getElementById('modal-dom');
  if (!domEl) {
    return null;
  }
  return ReactDOM.createPortal(<div>
    <button onClick={closeModal}>closeModal</button>
    {children}
  </div>, domEl);
})

export const useModel = () => {
  const [isVisible, setIsVisable] = useState(false);
  const show = () => setIsVisable(true);
  const close = () => setIsVisable(false);
  const RenderModal = ({ children }: { children: React.ReactChild }) => (<>{isVisible && <Modal closeModal={close} >{children}</Modal>}</>)
  return { show, close, RenderModal }
}

// 使用

const App = () => {
  const {show, close, RenderModal} = useModal();
	return (
  	<div id="model-dom">
      <button onClick={show}></button>
      <button onClick={close}></button>
      <RenderModal>
        <p>渲染内容</p>
      </RenderModal>
     </div>
  )
}

```


import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from "react";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

type TeleportContextValue = {
  node: ReactNode;
  setNode?: Dispatch<SetStateAction<ReactNode>>;
};

/**
 * Телепортирование ReactNode.
 * Доступно в виде пакета https://www.npmjs.com/package/@mukhindev/react-teleport.
 * Интегрировано сюда, чтобы не иметь зависимостей и переработать для нужно диалога.
 * */
export const createTeleport = () => {
  const TeleportContext = createContext<{
    node: ReactNode;
    setNode?: Dispatch<SetStateAction<ReactNode>>;
  }>({ node: null });

  function TeleportProvider({ children }: PropsWithChildren) {
    const [node, setNode] = useState<ReactNode>(null);

    const teleportContextValue = useMemo<TeleportContextValue>(() => {
      return { node, setNode };
    }, [node]);

    return (
      <TeleportContext.Provider value={teleportContextValue}>
        {children}
      </TeleportContext.Provider>
    );
  }

  function TeleportFrom({ children }: PropsWithChildren) {
    const { setNode } = useContext(TeleportContext);

    useLayoutEffect(() => {
      setNode?.(children);
    }, [children, setNode]);

    return null;
  }

  function TeleportTo({
    children,
  }: {
    children?: (node: ReactNode) => ReactNode;
  }) {
    const { node } = useContext(TeleportContext);

    // 0 в React выводится в DOM
    if (typeof children === "function") {
      return children(node);
    }

    return node;
  }

  return {
    Provider: TeleportProvider,
    From: TeleportFrom,
    To: TeleportTo,
  };
};

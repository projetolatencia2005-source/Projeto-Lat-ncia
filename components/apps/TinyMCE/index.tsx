import StyledTinyMceEditor from "components/apps/TinyMCE/StyledTinyMceEditor";
import useTinyMCE from "components/apps/TinyMCE/useTinyMCE";
import AppContainer, {
  useAppContainer,
} from "components/system/Apps/AppContainer";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";

const TinyMCE: FC<ComponentProcessProps> = ({ id }) => {
  const containerProps = useAppContainer(id);

  useTinyMCE(containerProps);

  return (
    <AppContainer
      {...containerProps}
      className={
        containerProps.url.toLowerCase().endsWith("/post-it.whtml")
          ? "doors-post-it"
          : undefined
      }
      StyledComponent={StyledTinyMceEditor}
    >
      <div id={id} />
    </AppContainer>
  );
};

export default TinyMCE;

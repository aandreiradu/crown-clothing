import {FC} from "react";
import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./DirectoryItem.styles";
import { DirectoryCategory } from "../Directory/Directory";

type DirectoryItemProps = {
  category : DirectoryCategory
}

const DirectoryItem : FC<DirectoryItemProps> = (props) => {
  const navigate = useNavigate();
  const { title, imageUrl,route } = props.category;

  const onNavigateHandler = () => navigate(route);


  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

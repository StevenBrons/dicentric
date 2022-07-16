import { FC, ReactElement } from "react";
import "./Screen.css";

type Props = {
  name: string,
	children: ReactElement
};

const Screen : FC<Props> = ({name, children}) => {
	return <div className={`Screen ${name}`}>
		{children}
	</div>
}

export default Screen;
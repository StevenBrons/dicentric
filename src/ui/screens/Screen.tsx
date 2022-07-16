import { FC, ReactNode } from "react";
import "./Screen.css";

type Props = {
  name: string,
	children: ReactNode | ReactNode[]
};

const Screen : FC<Props> = ({name, children}) => {
	return <div className={`Screen ${name}`}>
		{children}
	</div>
}

export default Screen;
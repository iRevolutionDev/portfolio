import React from "react";

type TitleProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({children}) => {
    return <h1 className="headline mt-20 text-3xl md:text-5xl lg:text-6xl">{children}</h1>
}

type DescriptionProps = {
  children: React.ReactNode;
};

const Description: React.FC<DescriptionProps> = ({children}) => {
  return <p className="my-8 text-lg">{children}</p>
}

type ContainerProps = {
    children: React.ReactNode;
}

type ContainerExports = {
    Title: typeof Title;
    Description: typeof Description;
}

const Container: React.FC<ContainerProps> & ContainerExports = ({ children }) => {
  return <div className="mx-auto w-full px-4 md:max-w-5xl">{children}</div>;
};

Container.Title = Title;
Container.Description = Description;

export {Container};
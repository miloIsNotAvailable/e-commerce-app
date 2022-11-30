import { FC } from "react";
import { renderToString } from "react-dom/server";

interface HydrateClientProps {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
    hydrate?: boolean
}

const HydrateClient: FC<HydrateClientProps> = ( { children, hydrate=false } ) => {

    return (
      <>
        {hydrate ? (
          <>{children}</>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        ${renderToString(children)}
        `,
            }}
          ></div>
        )}
      </>
    );
}

export default HydrateClient
import { FunctionComponent } from "react";

const SandBox: FunctionComponent<object> = () => {
  return (
    <>
      <h1 className="display-1 text-center" style={{ direction: "rtl" }}>
        אזור זה זמין למשתמש אדמין בלבד ונמצא כעת בשלבי פיתוח
        <br />
        עימכם הסליחה.
      </h1>
    </>
  );
};

export default SandBox;

import I18Ntext from "@/i18n";
import Line from "./line";
import useRank from "./useRank";

const List = ({ setVisibleRank }) => {
  const { lang, list } = useRank();

  return (
    <>
      <h3 className="bg-teal-950 p-2 text-center">
        <I18Ntext str="title.rank" /> {list.length >= 15 ? "(Top 15)" : null}
      </h3>

      {list.length ? (
        <table className="w-full text-sm">
          <tbody>
            {list.map((elem, k) => {
              if (k >= 15) {
                return null;
              }
              return <Line key={k} index={k} elem={elem} lang={lang} />;
            })}
          </tbody>
        </table>
      ) : (
        <div className="p-2 text-center text-sm">
          😢{" "}
          <span className="italic">
            <I18Ntext str="noWin.text" />
          </span>
        </div>
      )}
      <div className="text-center p-3 bg-teal-900">
        <button
          className=" bg-emerald-500 py-2 px-11 font-bold rounded-md shadow-md"
          onClick={() => {
            setVisibleRank(false);
          }}
        >
          Ok
        </button>
      </div>
    </>
  );
};

export default List;

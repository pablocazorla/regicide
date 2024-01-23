import clsx from "clsx";
import Icon from "../icon";
import I18Ntext from "@/i18n";
import Jokers from "../jokers";
import { useMemo } from "react";

const Line = ({ index, elem, lang }) => {
  const date = useMemo(() => {
    const d = new Date(elem?.date || 0);
    return new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(d);
  }, [elem, lang]);

  return (
    <tr className="border-b border-white/20">
      <td className="py-1 px-2 font-bold bg-teal-900 text-center">
        {index + 1}
      </td>
      <td
        className={clsx("p-1 text-center", {
          "text-amber-400": elem?.jokers >= 2,
          "text-gray-300": elem?.jokers === 1,
          "text-amber-600": elem?.jokers <= 0,
        })}
      >
        <Icon type="win" />
      </td>
      <td className="p-1">
        {elem?.roundNum || 0} <I18Ntext str="rounds" />
      </td>
      <td className="p-1 text-[11px]">{date}</td>
    </tr>
  );
};

export default Line;

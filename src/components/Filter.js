import { useState } from "react";
import TextFieldComponent from "@/components/TextFieldComponent";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Filter({
  id,
  label,
  setterTextField,
  getterTextField,
  size,
  listToFilter,
  category,
  setterToReturn,
}) {
  const [message, setMessage] = useState(false);

  const searchFunction = () => {
    let listFiltred;
    if (category === "user") {
      listFiltred = listToFilter.filter((element) =>
        element.user.lastName
          .toLowerCase()
          .includes(getterTextField.toLowerCase())
      );
    } else if (category === "exercise") {
      listFiltred = listToFilter.filter((element) =>
        element.title.toLowerCase().includes(getterTextField.toLowerCase())
      );
    }
    setterToReturn(listFiltred);

    listFiltred.length === listToFilter.length || listFiltred.length === 0
      ? setMessage(true)
      : setMessage(false);
  };
  return (
    <div>
      <div className="flex justify-center items-center gap-2 m-5 mb-1">
        <TextFieldComponent
          id={id}
          label={label}
          valueSetter={setterTextField}
          valueGetter={getterTextField}
          size={size}
        />
        <FontAwesomeIcon
          className="text-xl duration-75 hover:scale-125 text-[#00a5ac]"
          onClick={() => searchFunction()}
          icon={faMagnifyingGlass}
        />
      </div>
      {!message
        ? ""
        : setTimeout(() => setMessage(""), 5000) && (
            <p className="text-center">Aucun élément trouvé</p>
          )}
    </div>
  );
}

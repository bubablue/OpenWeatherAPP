import { createContext, Dispatch, LegacyRef, MutableRefObject, SetStateAction } from "react";
import { WeatherItem } from "../Components/WeatherItem";


type FormElement = React.FormEvent<HTMLFormElement>;

export type WeatherContextProperties = {

    handleSubmit: (ev: FormElement) => void;
    newLocation: string;
    setNewLocation: Dispatch<SetStateAction<string>>;
    LocationInput: LegacyRef<HTMLSelectElement> | undefined;
    array: WeatherItem[];
    AddItem: (postalcode: string) => void;
    RemoveItem: (name: string) => void;
    UpdateInfo: () => void;

}

export const WeatherContext = createContext<WeatherContextProperties>({} as WeatherContextProperties);

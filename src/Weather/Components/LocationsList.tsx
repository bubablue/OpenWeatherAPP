import { useWeather } from '../Hooks/useWeather';

export const OptionList = (): JSX.Element => {

  const { handleSubmit, setNewLocation, newLocation,
    LocationInput } = useWeather();

  return (

    <div className="row">
      <form onSubmit={(event) => {
        handleSubmit(event);
      }
      }>
        <select
          id="PostalCode"
          onChange={(ev) => {
            setNewLocation(ev.target.value);
          }}
          value={newLocation}
          className="form-control"
          ref={LocationInput}
        >
          <optgroup label="District E">
            <option value="E1"> Mile End, Stepney, Whitechapel </option>
            <option value="E2"> Bethnal Green, Shoreditch </option>
            <option value="E3"> Bow, Bromley-by-Bow </option>
            <option value="E4"> Chingford, Highams Park </option>
            <option value="E5"> Clapton </option>
            <option value="E6"> East Ham, Beckton </option>
            <option value="E7"> Forest Gate, Upton Park </option>
            <option value="E8"> Hackney, Dalston </option>
            <option value="E9"> Hackney, Homerton </option>
            <option value="E10"> Leyton </option>
            <option value="E11"> Leytonstone </option>
            <option value="E12"> Manor Park </option>
            <option value="E13"> Plaistow </option>
            <option value="E14"> Isle of Dogs, Mill wall, Poplar, Cubitt Town </option>
            <option value="E15"> Stratford, West Ham </option>
            <option value="E16"> Canning Town, North Woolwich </option>
            <option value="E17"> Walthamstow </option>
            <option value="E18"> South Woodford </option>
            <option value="E20"> Olympic Park, Stratford </option>
          </optgroup>
          <optgroup label="District N">
            <option value="N1"> Barnsbury, Canonbury, Islington </option>
            <option value="N2"> East Finchley </option>
            <option value="N3"> Finchley Central </option>
            <option value="N4"> Finsbury Park, Manor House </option>
            <option value="N5"> Highbury </option>
            <option value="N6"> Highgate </option>
            <option value="N7"> Holloway </option>
            <option value="N8"> Crouch End, Hornsey </option>
            <option value="N9"> Lower Edmonton </option>
            <option value="N10"> Muswell Hill </option>
            <option value="N11"> Friern Barnet, New Southgate </option>
            <option value="N12"> North Finchley, Woodside Park </option>
            <option value="N13"> Palmers Green </option>
            <option value="N14"> Southgate </option>
            <option value="N15"> Seven Sisters </option>
            <option value="N16"> Stamford Hill, Stoke Newington </option>
            <option value="N17"> Tottenham </option>
            <option value="N18"> Upper Edmonton </option>
            <option value="N19"> Archway, Tufnell Park </option>
            <option value="N20"> Totteridge, Whetstone, Oakleigh Park </option>
            <option value="N21"> Winchmore Hill </option>
            <option value="N22"> Alexandra Palace, Wood Green </option>
          </optgroup>
        </select>
        <button className="btn btn-success btn-block mt-3">Save</button>
      </form>
    </div>

  )

}


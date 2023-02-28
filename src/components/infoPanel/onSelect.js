import { useRef} from 'react'
import { EditToDo } from '../todo/Edit';
import { useContext } from 'react';
import { MainViewContext } from '../../pages/home/Main';

export function OnSelectEvent(test) {
    // const clickRef = useRef(null)
      /**
       * Here we are waiting 250 milliseconds (use what you want) prior to firing
       * our method. Why? Because both 'click' and 'doubleClick'
       * would fire, in the event of a 'doubleClick'. By doing
       * this, the 'click' handler is overridden by the 'doubleClick'
       * action.
       */
    //   window.clearTimeout(clickRef?.current);
    //   clickRef.current = 

    const { mainView } = useContext(MainViewContext);
    window.alert(test.end);
  
    // const onDoubleClickEvent = useCallback((calEvent) => {
    //   /**
    //    * Notice our use of the same ref as above.
    //    */
    //   window.clearTimeout(clickRef?.current);
    //   clickRef.current = window.setTimeout(() => {
    //     window.alert(buildMessage(calEvent, 'onDoubleClickEvent'))
    //   }, 250);
    // }, []);
}
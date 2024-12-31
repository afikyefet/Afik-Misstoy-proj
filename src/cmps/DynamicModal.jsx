import { useSelector } from "react-redux"
import { onCloseModal } from "../store/actions/modal.action"

export function DynamicModal(){

    const modalData = useSelector(storeState => storeState.modalModule.modalData)

    function onModalClose(){
        onCloseModal()
    }

    if (!modalData) return null
    const { cmp: Cmp, props } = modalData
        return (
        <div className="modal-wrapper">
            <section onClick={onModalClose} className="modal-back"></section>
            <section className="modal-container">
                <button onClick={onModalClose} className="close-btn">X</button>
                <div className="modal-content">
                {Cmp ? <Cmp {...props} /> : null}
                </div>
            </section>
        </div>
    )
}
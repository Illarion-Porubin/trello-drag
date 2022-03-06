import { CONSTANTS } from "../types/types";

let listId = 3;
let _id = 10;

const initialState = {
    lists: [
        {
            title: "IN PROGRESS",
            listId: 0,
            cards: [
                {
                    id: `card-${0}`,
                    text: "class "
                },
                {
                    id: `card-${1}`,
                    text: "created static 2"
                },
                {
                    id: `card-${2}`,
                    text: "created static 3"
                },
            ]
        },
        {
            title: "TO DO",
            listId: 1,
            cards: [
                {
                    id: `card-${3}`,
                    text: "created static 1"
                },
                {
                    id: `card-${4}`,
                    text: "created static 2"
                },
                {
                    id: `card-${5}`,
                    text: "created static 3"
                },
                {
                    id: `card-${6}`,
                    text: "created static 4"
                },
                {
                    id: `card-${7}`,
                    text: "created static 5"
                }
            ]
        },
        {
            title: "TO DO2",
            listId: 2,
            cards: [
                {
                    id: `card-${8}`,
                    text: "created static 1"
                },
                {
                    id: `card-${9}`,
                    text: "created static 2"
                },

            ]
        },
    ]
}

export const listsReducer = (state = initialState, action) => {

    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload.text,
                listId: `list-${listId}`,
                cards: []
            }
            listId += 1
            return { ...state, lists: [...state.lists, newList] }

        case CONSTANTS.CHANGE_TEXT: 
        console.log('ok')
            return {
                ...state,
                lists: state.lists.map(list => ({
                    ...list, title: list.listId === action.payload.id ? action.payload.text : list.title
                }))
            }

        // case CONSTANTS.CHANGE_TEXT:
        //     const newTitle = state.lists.find(list => list.listId === action.payload.id)
        //     const newText = newTitle.title = action.payload.text
        //     console.log(newText)
        //     return { ...state, newText }

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card-${_id}`,
            }
            _id += 1

            const newState = state.lists.map(list => {
                if (list.listId === action.payload.listId) {
                    return { ...list, cards: [...list.cards, newCard] }
                }
                else return list
            })
            return { lists: newState }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;

            const copyState = { ...state }

            if (type === "list") {
                const list = copyState.splice(+droppableIndexStart, 1);
                copyState.splice(+droppableIndexEnd, 0, ...list)
                return copyState;
            }

            if (droppableIdStart === "all-lists") {
                const list = copyState.lists.splice(+droppableIndexStart, 1);
                copyState.lists.splice(+droppableIndexEnd, 0, ...list);
                return copyState
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find(list => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find(list => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== "all-lists") {
                const list = state.lists.find(list => +droppableIdStart === list.listId)
                const card = list.cards.splice(+droppableIndexStart, 1)
                list.cards.splice(+droppableIndexEnd, 0, ...card)
                return { ...state, [+droppableIdStart]: list };
            }

            return copyState;

        default:
            return state;
    }
}
import { useState, React } from "react";
import { useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components"
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import {XUITA}  from "../../actions/actions"
import "./trelloCard.scss"

const CardContainer = styled.div`
  margin-bottom: 8px;
`

const TrelloCard = ({ text, id, index, listId }) => {
  let [cardText, setCardText] = useState(text);
  let [styleCard, setCardStyle] = useState(true);
  const dispatch = useDispatch();

  const changeText = (e) => {
    setCardText(cardText = e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.currentTarget.setAttribute("readonly", "true")
      dispatch(XUITA(id, listId, cardText))
    }
  }


  const changeStyle = () => {
    setCardStyle(styleCard === true ? false : true)
  }

  const removeStyle = () => {
    setCardStyle(styleCard = true)
  }

  // scss
  let style = styleCard ? "card__text" : "card__text--style"

  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Grid>
              <CardContent className="card__content">
                <Typography>
                  <input className={style}
                    type="text"
                    id={id}
                    value={cardText}
                    readOnly={styleCard}
                    onKeyDown={handleKeyDown}
                    onChange={changeText}
                    onBlur={removeStyle}
                  />
                </Typography>
                <div className="icon"
                  onClick={changeStyle}
                  onBlur={removeStyle}
                >
                  <EditIcon className="card__icon"
                  />
                </div>

              </CardContent>
            </Grid>
          </Card>
        </CardContainer>
      )}
    </Draggable>

  );
};




export default TrelloCard;
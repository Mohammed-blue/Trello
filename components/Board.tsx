// npm install react-beautiful-dnd --save
// npm i --save-dev  @types/react-beautiful-dnd
// appwrite for backend platform for developing Web, Mobile, and Flutter applications.

'use client'

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { useBoardStore } from '@/store/BoardStore';
import Column from '@/components/Column';



function Board() {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) =>
    [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodoInDB,
    ]);


    useEffect(() => {
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (resulte: DropResult) => {
        const { destination, source, type } = resulte;

        // Check if user dragged card outside board:
        if (!destination) return;

        // Handle column drag:
        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangedColumns,
            });

        }


        // Handle card drag:
        // This step is needed as the indexes are stored as number 0,1,2 etc. instead of id's with DND library:
        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)]

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos,
        }

        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos,
        };
        // console.log(startCol, finishCol);

        if (!startCol || !finishCol) return;

        if (source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (startCol.id === finishCol.id) {
            // Same column task drag
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);

            setBoardState({ ...board, columns: newColumns });
        } else {
            // Dragging to another column
            const finishTodos = Array.from(finishCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };

            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos,
            });

            // Update in DB:
            updateTodoInDB(todoMoved, finishCol.id);

            setBoardState({ ...board, columns: newColumns });
        }


        // console.log(destination);
        // console.log(source);
        // console.log(type);

    };

    // console.log(board)
    return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction='horizontal' type='column'>
            {(provided) =>
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-w-7xl mx-auto"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {/* Rendering all the columns */}
                    {
                    Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column
                            key={id}
                            id={id}
                            todos={column.todos}
                            index={index}
                        />
                    ))
                    }

                </div>
                }
        </Droppable>
    </DragDropContext>
    )
}

export default Board
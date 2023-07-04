// use interface when you need to extend something

interface Board {
    columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
    id: TypedColumn,
    todos: Todo[]
}

// appwrite, so we us '$'
interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: Image,

}

interface Image {
    bucketId: string,
    fileId: string,
}


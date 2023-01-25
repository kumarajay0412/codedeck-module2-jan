import { createContext, useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

export const PlayGroundContext = createContext();

export const languageMap = {
    "cpp": {
        id: 54,
        defaultCode:
            "#include <iostream>\n"
            + "using namespace std;\n\n"
            + "int main() {\n"
            + '\tcout << "Hello World!";\n'
            + "\treturn 0;\n"
            + "}",
    },
    "java": {
        id: 62,
        defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
    },
    "python": {
        id: 71,
        defaultCode: `print("Hello World!")`,
    },
    "javascript": {
        id: 63,
        defaultCode: `console.log("Hello World!");`,
    }
}

const PlaygroundProvider = ({ children }) => {
    const [user] = useState(auth);
    const [firstLoad, setFirstLoad] = useState(true);
    const intialItems = {
        [uuid()]: {
            title: "DSA",
            playgrounds: {
                [uuid()]: {
                    title: "Arrays",
                    language: "cpp",
                    code: languageMap["cpp"].defaultCode,
                },
                [uuid()]: {
                    title: "Dsa",
                    language: "javascript",
                    code: languageMap["javascript"].defaultCode,
                },
            }
        }
    }
    const [folders, setFolders] = useState(() => {
        let localData = localStorage.getItem("playground-data");
        if (localData === null || localData === undefined) {
            return intialItems;
        }
        return JSON.parse(localData);

    });

    useEffect(() => {
        if (user && firstLoad) { // we are geting data from the firebase
            const resultRef = db.collection("users").doc(user.uid);
            resultRef.get().then((response) => {
                setFolders(response.data());
                setFirstLoad(false);
            }).catch((err) => {
                console.log(err)
            })
        }
        if (user && !firstLoad) {   // we are sending data to firebase
            const resultRef = db.collection("users").doc(user.uid);
            resultRef.set(folders).then((response) => {
                console.log("Data saved successfully");
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            localStorage.setItem("playground-data", JSON.stringify(folders));
        }
    }, [folders, user])

    const deleteCard = (folderId, cardId) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            delete newFolders[folderId].playgrounds[cardId]
            return newFolders;
        })
    }

    const deleteFolder = (folderId) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            delete newFolders[folderId];
            return newFolders;
        })
    }

    const addFolder = (folderName) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            newFolders[uuid()] = {
                title: folderName,
                playgrounds: {}
            }
            return newFolders;
        })
    }

    const addPlayground = (folderId, playgroundName, language) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            newFolders[folderId].playgrounds[uuid()] = {
                title: playgroundName,
                language: language,
                code: languageMap[language].defaultCode,
            }
            return newFolders;
        })
    }
    const addPlaygroundAndFolder = (folderName, playgroundName, cardLanguage) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            newFolders[uuid()] = {
                title: folderName,
                playgrounds: {
                    [uuid()]: {
                        title: playgroundName,
                        language: cardLanguage,
                        code: languageMap[cardLanguage].defaultCode,
                    }
                }
            }
            return newFolders;
        })
    }
    const editFolderTitle = (folderId, newTitle) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            newFolders[folderId].title = newTitle;
            return newFolders;
        })
    }
    const editPlaygroundTitle = (folderId, cardId, newTitle) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            newFolders[folderId].playgrounds[cardId].title = newTitle;
            return newFolders;
        })
    }
    const saveCode = (folderId, cardId, newCode, newLanguage) => {
        setFolders((prevFolders) => {
            const newFolders = { ...prevFolders };
            newFolders[folderId].playgrounds[cardId].code = newCode;
            newFolders[folderId].playgrounds[cardId].language = newLanguage;
            return newFolders;
        })
    }

    const PlayGroundFeatures = {
        folders: folders,
        deleteCard: deleteCard,
        deleteFolder: deleteFolder,
        addFolder: addFolder,
        addPlayground: addPlayground,
        addPlaygroundAndFolder: addPlaygroundAndFolder,
        editFolderTitle: editFolderTitle,
        editPlaygroundTitle: editPlaygroundTitle,
        saveCode: saveCode,
    }
    return (
        <PlayGroundContext.Provider value={PlayGroundFeatures}>
            {children}
        </PlayGroundContext.Provider>)
}

export default PlaygroundProvider;
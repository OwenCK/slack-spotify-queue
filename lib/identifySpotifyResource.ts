const URL_START = "https://open.spotify.com/";
const URI_START = "spotify:";

interface IResource {
    type: string;
    id: string;
}

export default function(rawInputString: string): IResource | null {
    let inputString = rawInputString.trim();

    if (inputString.startsWith("<") && inputString.endsWith(">")) {
        inputString = inputString.substring(1, inputString.length - 1);
    }
    const isUrl = inputString.startsWith(URL_START);
    const isUri = inputString.startsWith(URI_START);

    if (isUrl || isUri) {
        const start = isUrl ? URL_START : URI_START;
        const divider = isUrl ? "/" : ":";
        const components = inputString.substring(start.length, inputString.length).split(divider);
        const type = components[0];
        const id = components[1];

        if (type && id) {
            if (type === "track" || type === "playlist" || type === "album") {
                const resource: IResource = {
                    id,
                    type
                };
                return resource;
            }
        }
    }
}

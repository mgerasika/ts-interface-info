import { calcSymbolsCount } from './calc-symbols-count.util';

export const findBody = ({
    startWord: startWord,
    fileContent,
    START_SYMBOL = '{',
    END_SYMBOL = '}',
}: {
    startWord: string;
    fileContent: string;
    START_SYMBOL?: string;
    END_SYMBOL?: string;
}): string[] => {
    let startIdx = fileContent.indexOf(startWord);
    const res = [];
    let position = 0;

    while (startIdx >= 0) {
        startIdx = fileContent.indexOf(startWord, position);
        let startCount = 0;
        let endCount = 0;
        let tmp;
        do {
            const endIdx = fileContent.indexOf(END_SYMBOL, position) + 1;
            if (endIdx === 0) {
                startIdx = -1;
                position = -1;
                break;
            }
            tmp = fileContent.substring(startIdx, endIdx).trim();

            startCount = calcSymbolsCount(tmp, START_SYMBOL);
            endCount = calcSymbolsCount(tmp, END_SYMBOL);
            position = endIdx;
        } while (startCount !== endCount);
        if (tmp) {
            if (tmp.startsWith(startWord)) {
                const text = tmp
                    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
                    .replace(/[\n\t]*/g, '')
                    // eslint-disable-next-line no-regex-spaces
                    .replace(/  /g, '');
                res.push(text);
            }
        }
        if (position === -1) {
            break;
        }
        startIdx = position;
    }

    return res;
};

import { expect } from '@jest/globals';
import { findBody } from '../src/utils/find-body.util';

describe('find-interface-body', () => {
    it('default', () => {
        expect(findBody({ startWord: 'interface', fileContent: 'example a interface A {}' })).toEqual(['interface A {}']);
        expect(findBody({ startWord: 'interface', fileContent: 'example b interface A{}' })).toEqual(['interface A{}']);
        expect(
            findBody({
                startWord: 'interface',
                fileContent: `interface A{
	  }`,
            }),
        ).toEqual([`interface A{}`]);
    });

    it('2 interfaces in one file', () => {
        expect(
            findBody({
                startWord: 'interface',
                fileContent: 'interface A {} interface B {}',
            }),
        ).toEqual(['interface A {}', 'interface B {}']);
    });

    it('interfaces with generic', () => {
        expect(findBody({ startWord: 'interface', fileContent: 'interface A<string> {}' })).toEqual([
            'interface A<string> {}',
        ]);
    });

    it('interfaces with extend', () => {
        expect(
            findBody({
                startWord: 'interface',
                fileContent: 'interface A extend string {}',
            }),
        ).toEqual(['interface A extend string {}']);
    });

    it('find generic body', () => {
        expect(
            findBody({
                startWord: '<',
                START_SYMBOL: '<',
                END_SYMBOL: '>',
                fileContent: 'Color<string>',
            }),
        ).toEqual(['<string>']);
    });

    it('find nested generic body', () => {
        expect(
            findBody({
                startWord: '<',
                START_SYMBOL: '<',
                END_SYMBOL: '>',
                fileContent: 'Color<string<number>>',
            }),
        ).toEqual(['<string<number>>']);
    });

    it('find body when omit', () => {
        expect(
            findBody({
                startWord: '<',
                START_SYMBOL: '<',
                END_SYMBOL: '>',
                fileContent: 'Omit<B<number,number,number>>',
            }),
        ).toEqual(['<B<number,number,number>>']);

        expect(
            findBody({
                startWord: '<',
                START_SYMBOL: '<',
                END_SYMBOL: '>',
                fileContent: 'B<number,number,number>',
            }),
        ).toEqual(['<number,number,number>']);
    });
});

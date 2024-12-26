// export class ActionData {
//
//     public text: string = ""
//     public inputData: string = ""
//
//     constructor(text: string, inputData?: string) {
//         this.text = text
//         this.inputData = inputData?.toLowerCase() ?? ""
//     }
// }

export type ActionData = {
    text: string
    inputData?: string
};
import {
    Plugin,
    getFrontend,
    getBackend,
    IModel,
    Protyle,
    IProtyle,
    Toolbar

} from "siyuan";
import "./index.scss";

const STORAGE_NAME = "menu-config";
const TAB_TYPE = "custom_tab";
const DOCK_TYPE = "dock_tab";

export default class PluginSample extends Plugin {

    private customTab: () => IModel;
    private isMobile: boolean;

    onload() {
        this.data[STORAGE_NAME] = { readonlyText: "Readonly" };


        this.protyleOptions = {
            toolbar: ["block-ref",
                "a",
                "|",
                "text",
                "strong",
                "em",
                "u",
                "s",
                "mark",
                "sup",
                "sub",
                "clear",
                "|",
                "code",
                "kbd",
                "tag",
                "inline-math",
                "inline-memo",
                "|",
                {
                    name: "add quote",
                    icon: "iconQuote",
                    hotkey: "⌘''",
                    tipPosition: "n",
                    tip: this.i18n.insertQuote,
                    click(protyle: Protyle) {
                        const range = protyle.getRange(protyle.protyle.wysiwyg.element);
                        let selectedText = range.toString();


                        // 定义要检测的引号类型
                        const quotes = [
                            { start: '"', end: '"' },
                            { start: "“", end: "”" },
                            { start: "『", end: "』" },
                            { start: "「", end: "」" }
                        ];

                        // 检查并去除引号
                        let hasQuotes = false;
                        for (const quote of quotes) {
                            if (selectedText.startsWith(quote.start) && selectedText.endsWith(quote.end)) {
                                selectedText = selectedText.substring(1, selectedText.length - 1);
                                hasQuotes = true;
                                break;  // 一旦去除引号后，跳出循环
                            }
                        }

                        // 如果没有引号，则添加中文引号
                        if (!hasQuotes) {
                            selectedText = `“${selectedText}”`;
                        }

                        // 插入处理后的文本
                        protyle.insert(selectedText);


                    }


                }],
        };

        console.log(this.i18n.helloPlugin);
    }

    onLayoutReady() {
        this.loadData(STORAGE_NAME);
        console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);
    }

    onunload() {
        console.log(this.i18n.byePlugin);
    }

    uninstall() {
        console.log("uninstall");
    }
}
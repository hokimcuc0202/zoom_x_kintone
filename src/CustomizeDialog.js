import common from './common';
import {Dialog, Dropdown, Button} from '@kintone/kintone-ui-component/esm/js/index';
export class CustomizeDialog {
    constructor(event) {
        this.event = event;
        this.dialog = new Dialog({
          header: "Mapping setting",
          showCloseButton: true
        });
        this.setContent();
        this.setFooter();
    }

    setContent() {
        const topicContainer = document.createElement('div');
        const label = document.createElement('span');
        label.textContent = 'Topic: ';
        topicContainer.appendChild(label);
        this.topic = new Dropdown({items: common.getFields(this.event), value: common.getFields(this.event)[5].value});
        topicContainer.appendChild(this.topic.render())

        const startTimeContainer = document.createElement('div');
        const startTimeLbl = document.createElement('span');
        startTimeLbl.textContent = 'Start time: ';
        topicContainer.appendChild(startTimeLbl);
        this.startTime = new Dropdown({items: common.getFields(this.event), value: common.getFields(this.event)[6].value});
        startTimeContainer.appendChild(this.startTime.render())

        const endTimeContainer = document.createElement('div');
        const endTimeLbl = document.createElement('span');
        endTimeLbl.textContent = 'Topic: ';
        endTimeContainer.appendChild(endTimeLbl);
        this.endTime = new Dropdown({items: common.getFields(this.event), value: common.getFields(this.event)[7].value});
        endTimeContainer.appendChild(this.endTime.render())

        const urlContainer = document.createElement('div');
        const urlLbl = document.createElement('span');
        urlLbl.textContent = 'Start time: ';
        urlContainer.appendChild(urlLbl);
        this.url = new Dropdown({items: common.getFields(this.event), value: common.getFields(this.event)[8].value});
        urlContainer.appendChild(this.url.render())

        const contentEl = document.createElement('div');
        contentEl.appendChild(topicContainer);
        contentEl.appendChild(startTimeContainer);
        contentEl.appendChild(endTimeContainer);
        contentEl.appendChild(urlContainer);

        this.dialog.setContent(contentEl);
    }
    setFooter() {
        const btn = new Button({text: 'Save'});
        this.dialog.setFooter(btn.render());
        btn.on('click', () => {
            localStorage.setItem("zoom_topic", this.topic.getValue());
            localStorage.setItem("zoom_start_time", this.startTime.getValue());
            localStorage.setItem("zoon_end_time", this.endTime.getValue());
            localStorage.setItem("zoom_url", this.url.getValue());
            this.dialog.hide();
        })
    }
    show() {
        this.dialog.show();
    }

    render() {
        return this.dialog.render();
    }
}
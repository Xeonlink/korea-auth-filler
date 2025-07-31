import { PublicPath } from "wxt/browser";
import { solveCaptcha } from "./captcha";

type Options = {
  delay?: number;
  retry?: number;
};

type Task = () => Promise<void>;

export class Locator<T extends HTMLElement = HTMLElement> {
  private readonly selector: string;
  private readonly delay: number;
  private readonly retry: number;
  protected tasks: Task[];

  constructor(selector: string, options?: Options) {
    this.delay = options?.delay ?? 100;
    this.retry = options?.retry ?? 100;
    this.selector = selector;
    this.tasks = [];
  }

  public get element() {
    return document.querySelector<T>(this.selector);
  }

  // execute functions -----------------------------------------------

  public async run() {
    for (const task of this.tasks) {
      await task();
    }
    this.tasks = [];
    return this;
  }

  public async click() {
    this.tasks.push(async () => {
      this.element?.click();
    });
    return await this.run();
  }

  public async on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => Promise<void> | void,
    options?: boolean | AddEventListenerOptions,
  ) {
    this.tasks.push(async () => {
      this.element?.addEventListener(type, listener, options);
    });
    return await this.run();
  }

  public async focus() {
    this.tasks.push(async () => {
      this.element?.focus();
    });
    return await this.run();
  }

  public async setAttribute(name: string, value: string) {
    this.tasks.push(async () => {
      this.element?.setAttribute(name, value);
    });
    return await this.run();
  }

  // condition functions -----------------------------------------------

  public async effect(fn: () => Promise<void> | void) {
    this.tasks.push(async () => {
      await fn();
    });
    return this;
  }

  public visible() {
    this.tasks.push(async () => {
      await this.waitFor(() => this.element?.checkVisibility() ?? false);
    });
    return this;
  }

  public exists() {
    this.tasks.push(async () => {
      await this.waitFor(() => this.element !== null);
    });
    return this;
  }

  protected async waitFor(checkFn: () => boolean | Promise<boolean>) {
    for (let i = 0; i < this.retry; i++) {
      if (await checkFn()) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, this.delay));
    }
    return false;
  }
}

export class InputLocator extends Locator<HTMLInputElement> {
  public async check(value: boolean = true) {
    this.tasks.push(async () => {
      const element = this.element;
      if (element && element.checked !== value) {
        element.click();
      }
    });
    return await this.run();
  }

  public async fill(value: string) {
    this.tasks.push(async () => {
      const element = this.element;
      if (element) {
        element.value = value;
        this.triggerEvent(element);
      }
    });
    return await this.run();
  }

  private triggerEvent(target: HTMLInputElement) {
    target.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
    target.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    target.dispatchEvent(new Event("keydown", { bubbles: true, cancelable: true }));
    target.dispatchEvent(new Event("keypress", { bubbles: true, cancelable: true }));
    target.dispatchEvent(new Event("keyup", { bubbles: true, cancelable: true }));
    target.dispatchEvent(new Event("invalid", { bubbles: true, cancelable: true }));
  }
}

export class FormLocator extends Locator<HTMLFormElement> {
  public submit() {
    this.tasks.push(async () => {
      this.element?.submit();
    });
    return this.run();
  }
}

export class ImageLocator extends Locator<HTMLImageElement> {
  public loaded() {
    this.tasks.push(async () => {
      await this.waitFor(() => this.element?.complete ?? false);
    });
    return this;
  }

  public waitForDataUrlChange(old_b64: string) {
    this.tasks.push(async () => {
      await this.waitFor(() => this.dataUrl !== old_b64);
    });
    return this;
  }

  public waitNew(refresher: (() => Promise<any> | any) | Locator<any>) {
    this.tasks.push(async () => {
      const old_b64 = this.dataUrl;
      if (refresher instanceof Locator) {
        await refresher.click();
      } else {
        await refresher();
      }
      await this.waitFor(() => this.dataUrl !== old_b64);
    });
    return this;
  }

  public get dataUrl() {
    const canvas = document.createElement("canvas");
    canvas.width = this.element!.naturalWidth;
    canvas.height = this.element!.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }
    ctx.drawImage(this.element!, 0, 0);
    return canvas.toDataURL("image/png");
  }

  public async solveCaptcha(model: PublicPath) {
    await this.run();
    const captchaText = await solveCaptcha(model, this.element!);
    return captchaText;
  }
}

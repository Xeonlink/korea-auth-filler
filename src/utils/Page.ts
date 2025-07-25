import { ContentScriptContext } from "wxt/client";
import { wait } from "./utils";

interface PageOptions {
  wait?: number;
  retry?: number;
}

export class Page {
  private readonly context: ContentScriptContext;
  private readonly wait: number;
  private readonly retry: number;

  public constructor(context: ContentScriptContext, pageOptions?: PageOptions) {
    this.context = context;
    this.wait = pageOptions?.wait ?? 100;
    this.retry = pageOptions?.retry ?? 20;
  }

  public async q<T extends HTMLElement>(selector: string): Promise<T | null> {
    for (let i = 0; i < this.retry; i++) {
      const element = document.querySelector(selector);
      if (element && element.checkVisibility()) {
        return element as T;
      }
      await wait(this.wait);
    }
    console.log("q", selector, "timeout not found");
    return null;
  }

  public async qAll<T extends HTMLElement>(selector: string): Promise<T[]> {
    for (let i = 0; i < this.retry; i++) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        return Array.from(elements) as T[];
      }
      await wait(this.wait);
    }
    return [];
  }

  public async qById<T extends HTMLElement>(id: string): Promise<T | null> {
    for (let i = 0; i < this.retry; i++) {
      const element = document.getElementById(id);
      if (element && element.checkVisibility()) {
        return element as T;
      }
      await wait(this.wait);
    }
    return null;
  }

  public setTimeout(callback: () => void, timeout: number) {
    return this.context.setTimeout(callback, timeout);
  }

  public setInterval(callback: () => void, timeout: number) {
    return this.context.setInterval(callback, timeout);
  }
}

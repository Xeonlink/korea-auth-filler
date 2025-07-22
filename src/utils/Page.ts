import { ContentScriptContext } from "wxt/client";
import { wait } from "./utils";

interface PageOptions {
  timeout?: number;
  retry?: number;
}

export class Page {
  private readonly context: ContentScriptContext;
  private readonly timeout: number;
  private readonly retry: number;

  public constructor(context: ContentScriptContext, pageOptions?: PageOptions) {
    this.context = context;
    this.timeout = pageOptions?.timeout ?? 50;
    this.retry = pageOptions?.retry ?? 20;
  }

  public async q<T extends HTMLElement>(selector: string): Promise<T | null> {
    for (let i = 0; i < this.retry; i++) {
      const element = document.querySelector(selector);
      if (element) {
        return element as T;
      }
      await wait(this.timeout);
    }
    return null;
  }

  public async qAll<T extends HTMLElement>(selector: string): Promise<T[]> {
    for (let i = 0; i < this.retry; i++) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        return Array.from(elements) as T[];
      }
      await wait(this.timeout);
    }
    return [];
  }

  public async qById<T extends HTMLElement>(id: string): Promise<T | null> {
    for (let i = 0; i < this.retry; i++) {
      const element = document.getElementById(id);
      if (element) {
        return element as T;
      }
      await wait(this.timeout);
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

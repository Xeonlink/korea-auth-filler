import { ContentScriptContext } from "wxt/client";
import { FormLocator, ImageLocator, InputLocator, Locator } from "./Locator";

export class Page {
  private readonly delay: number;
  private readonly retry: number;
  private readonly context: ContentScriptContext;
  public readonly url: URL;

  constructor(
    context: ContentScriptContext,
    url: URL,
    options?: { delay?: number; retry?: number },
  ) {
    this.delay = options?.delay ?? 100;
    this.retry = options?.retry ?? 100;
    this.context = context;
    this.url = url;
  }

  public q<T extends HTMLElement>(selector: string) {
    return new Locator<T>(selector);
  }

  public qAll<T extends HTMLElement>(selector: string): T[] {
    return Array.from(document.querySelectorAll(selector)) as T[];
  }

  public qById<T extends HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
  }

  // locators 모음 ------------------------------------------
  public input(selector: string) {
    return new InputLocator(selector);
  }

  public button(selector: string) {
    return new Locator<HTMLButtonElement>(selector);
  }

  public form(selector: string) {
    return new FormLocator(selector);
  }

  public image(selector: string) {
    return new ImageLocator(selector);
  }

  public setInterval(fn: () => void, delay: number) {
    return setInterval(fn, delay);
  }

  public setTimeout(fn: () => void, delay: number) {
    return setTimeout(fn, delay);
  }

  // utils ------------------------------------------------
  public async wait(delay: number = 100) {
    return await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

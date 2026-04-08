import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toolbar.module.css';
import { ListIcon, OlIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, UndoIcon, RedoIcon } from '../icons/icons';


function isActive(cmd) {
  return document.queryCommandState(cmd);
}

export function Toolbar({ editorRef }) {

  function exec(cmd, value = null) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
    editorRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
  }

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Форматирование текста">
      <select
        className={styles.tbSelect}
        defaultValue=""
        onChange={(e) => exec('fontName', e.target.value)}
        aria-label="Шрифт"
      >
        <option value="" disabled>Шрифт</option>
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
        <option value="Georgia">Georgia</option>
        <option value="Arial">Arial</option>
      </select>

      <select
        className={styles.tbSelect}
        defaultValue=""
        onChange={(e) => exec('fontSize', e.target.value)}
        aria-label="Размер текста"
      >
        <option value="" disabled>Размер</option>
        <option value="1">Маленький</option>
        <option value="3">Обычный</option>
        <option value="5">Большой</option>
        <option value="7">Огромный</option>
      </select>

      <hr className={styles.tbSep} />

      <TbBtn title="Жирный (Ctrl+B)" onClick={() => exec('bold')} active={isActive('bold')}>
        <strong>B</strong>
      </TbBtn>
      <TbBtn title="Курсив (Ctrl+I)" onClick={() => exec('italic')} active={isActive('italic')}>
        <em>I</em>
      </TbBtn>
      <TbBtn title="Подчёркнутый (Ctrl+U)" onClick={() => exec('underline')} active={isActive('underline')}>
        <u>U</u>
      </TbBtn>
      <TbBtn title="Зачёркнутый" onClick={() => exec('strikeThrough')} active={isActive('strikeThrough')}>
        <s>S</s>
      </TbBtn>

      <hr className={styles.tbSep} />

      <TbBtn title="Заголовок H1" onClick={() => exec('formatBlock', 'h1')}>H1</TbBtn>
      <TbBtn title="Заголовок H2" onClick={() => exec('formatBlock', 'h2')}>H2</TbBtn>
      <TbBtn title="Параграф" onClick={() => exec('formatBlock', 'p')}>¶</TbBtn>

      <hr className={styles.tbSep} />

      <TbBtn title="Маркированный список" onClick={() => exec('insertUnorderedList')} active={isActive('insertUnorderedList')}>
        <ListIcon />
      </TbBtn>
      <TbBtn title="Нумерованный список" onClick={() => exec('insertOrderedList')} active={isActive('insertOrderedList')}>
        <OlIcon />
      </TbBtn>

      <hr className={styles.tbSep} />

      <TbBtn title="По левому краю" onClick={() => exec('justifyLeft')}>
        <AlignLeftIcon />
      </TbBtn>
      <TbBtn title="По центру" onClick={() => exec('justifyCenter')}>
        <AlignCenterIcon />
      </TbBtn>
      <TbBtn title="По правому краю" onClick={() => exec('justifyRight')}>
        <AlignRightIcon />
      </TbBtn>

      <hr className={styles.tbSep} />

      <label className={styles.tbColorLabel} title="Цвет текста">
        <span className={styles.tbColorLetter}>A</span>
        <input
          type="color"
          className={styles.tbColorInput}
          onChange={(e) => exec('foreColor', e.target.value)}
          aria-label="Цвет текста"
        />
      </label>

      <label className={styles.tbColorLabel} title="Выделение цветом" style={{ marginLeft: 2 }}>
        <span className={`${styles.tbColorLetter} ${styles.tbColorLetterHighlight}`}>A</span>
        <input
          type="color"
          className={styles.tbColorInput}
          defaultValue="#FFE08A"
          onChange={(e) => exec('hiliteColor', e.target.value)}
          aria-label="Цвет выделения"
        />
      </label>

      <hr className={styles.tbSep} />

      <TbBtn title="Отменить (Ctrl+Z)" onClick={() => exec('undo')}>
        <UndoIcon />
      </TbBtn>
      <TbBtn title="Повторить (Ctrl+Y)" onClick={() => exec('redo')}>
        <RedoIcon />
      </TbBtn>
    </div>
  );
}

Toolbar.propTypes = {
  editorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

function TbBtn({ title, onClick, active, children }) {
  return (
    <button
      className={active ? `${styles.tbBtn} ${styles.active}` : styles.tbBtn}
      title={title}
      aria-pressed={active}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    >
      {children}
    </button>
  );
}

TbBtn.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

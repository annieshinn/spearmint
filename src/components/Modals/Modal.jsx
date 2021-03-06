/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { useCopy, useNewTest, useGenerateScript } from './modalHooks';

const Modal = ({
  title,
  isModalOpen,
  closeModal,
  dispatchToMockData,
  dispatchTestCase,
  createTest,
  testType = null,
  puppeteerUrl = 'sample.io',
}) => {
  const { copySuccess, codeRef, handleCopy } = useCopy();
  const { handleNewTest } = useNewTest(
    dispatchToMockData,
    dispatchTestCase,
    createTest,
    closeModal,
  );

  const script = useGenerateScript(title, testType, puppeteerUrl);

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Save?"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div id={styles.title}>
        <p>{title === 'New Test' ? title : 'Copy to Terminal'}</p>
      </div>
      <div id={styles.body}>
        {title === 'New Test'
          ? (
            <p id={styles.text}>
              Do you want to start a new test? All unsaved changes
              <br />
              will be lost.
            </p>
          )
          : (
            <pre>
              <div className="code-wrapper">
                <code ref={codeRef}>
                  {script}
                </code>

                {testType === 'react'
                  ?
                    <p id={styles.endpoint}>
                    Requires React version 16 or less.
                    </p>
                  : null
                }

                <p id={styles.endpoint}>
                  Note if you are using Create React App do not install jest
                </p>
              </div>
            </pre>
          )}
        <span id={styles.newTestButtons}>
          {title === 'New Test'
            ? (
              <button id={styles.save} onClick={handleNewTest}>
                {title}
              </button>
            )
            : (
              <button id={styles.save} onClick={handleCopy}>
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            )}
          <button id={styles.save} onClick={closeModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default Modal;

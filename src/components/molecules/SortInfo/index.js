import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SortInfo = ({
  title,
  description,
  pseudo,
  reallife,
  algo,
  exmp,
  worstCase,
  avgCase,
  bestCase,
  space
}) => {
  return (
    <div className="SortInfo">
      <hr />
      <h1>{title ? title : 'Choose an Algorithm First'}</h1>

      <div className="SortInfo__Body">
        <article className="SortInfo__Article">
          {description ? (
            description
          ) : (
            <p>
              Choose an Algorithm first please.
            </p>
          )}
        </article>

        <aside className="SortInfo__Aside">
          <h3>Performance</h3>
          <table>
            <tbody>
              <tr>
                <td>Worst-case time complexity</td>
                <td>
                  <code>{worstCase}</code>
                </td>
              </tr>

              <tr>
                <td>Average time complexity</td>
                <td>
                  <code>{avgCase}</code>
                </td>
              </tr>

              <tr>
                <td>Best-case time complexity</td>
                <td>
                  <code>{bestCase}</code>
                </td>
              </tr>

              <tr>
                <td>Worst-case space complexity</td>
                <td>
                  <code>{space}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </aside>

        <article className="reallife">
          {reallife ? (
            reallife
          ) : (
            <p>
              
            </p>
          )}
        </article>
        

        <article className="pseudo">
          {pseudo ? (
            pseudo
          ) : (
            <p>
               
            </p>
          )}
        </article>

      

        <article className="algo">
          {algo ? (
            algo
          ) : (
            <p>

            </p>
          )}
        </article>

        <article className="exmp">
          {exmp ? (
            exmp
          ) : (
            <p>

            </p>
          )}
        </article>

      </div>
    </div>
  );
};

SortInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.object,
  Pseudo: PropTypes.object,
  reallife:PropTypes.object,
  algo:PropTypes.object,
  exmp: PropTypes.object,
  worstCase: PropTypes.object,
  avgCase: PropTypes.object,
  bestCase: PropTypes.object,
  space: PropTypes.object
};

export default SortInfo;
